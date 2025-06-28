 <form onSubmit={handleSubmit(handleSubmitArticle)} className="space-y-6 px-4 max-h-[90vh] overflow-y-auto bg-white">
  {/* Nom et Description */}
  <div className="space-y-4">
    <div>
      <Label htmlFor="nom">Nom <span className="text-red-500">*</span></Label>
      <Input id="nom" {...register('nom')} placeholder="Nom de l'article" />
      {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
    </div>

    <div>
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" {...register('description')} placeholder="Description de l'article" rows={3} />
      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
    </div>
  </div>

  {/* Catégorie et Collection */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="categorie_id">Catégorie <span className="text-red-500">*</span></Label>
      <Controller
        name="categorie_id"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.categorie_id && <p className="text-red-500 text-sm mt-1">{errors.categorie_id.message}</p>}
    </div>

    <div>
      <Label htmlFor="collection_id">Collection</Label>
      <Controller
        name="collection_id"
        control={control}
        render={({ field }) => (
          <Select value={field.value || ''} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.collection_id && <p className="text-red-500 text-sm mt-1">{errors.collection_id.message}</p>}
    </div>
  </div>

  {/* Genre */}
  <div>
    <Label htmlFor="genre">Genre</Label>
    <Controller
      name="genre"
      control={control}
      render={({ field }) => (
        <Select value={field.value || ''} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HOMME">HOMME</SelectItem>
            <SelectItem value="FEMME">FEMME</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
  </div>

  {/* Prix et Quantité */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="prix">Prix (€)</Label>
      <Input id="prix" type="number" step="0.01" min="0" {...register('prix')} placeholder="0.00" />
      {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>}
    </div>

    <div>
      <Label htmlFor="quantite">Quantité</Label>
      <Input id="quantite" type="number" min="0" {...register('quantite')} placeholder="0" />
      {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite.message}</p>}
    </div>
  </div>

  {/* Promotion */}
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-2">
      <Controller
        name="estEnPromotion"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id="estEnPromotion"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="rounded"
          />
        )}
      />
      <Label htmlFor="estEnPromotion">Article en promotion</Label>
    </div>

    <div>
      <Label htmlFor="prixPromotion">Prix promotionnel (€)</Label>
      <Input
  id="prixPromotion"
  type="number"
  step="0.01"
  min="0"
  {...register('prixPromotion', {
    setValueAs: v => v === "" ? undefined : Number(v)
  })}
/>
      {errors.prixPromotion && <p className="text-red-500 text-sm mt-1">{errors.prixPromotion.message}</p>}
    </div>
  </div>

  {/* Image */}
  <div>
    <Label htmlFor="image">Image</Label>
    <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0] as File;
                setFiles([file]);
              }
            }}
            id="image"
            
            multiple={false}
            accept="image/*"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        
          />
    <p className="text-xs text-gray-500 mt-1">Formats: JPEG, PNG, GIF, WebP (max 10 Mo)</p>
{typeof errors.image?.message === "string" && (
  <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
)}
  </div>

  {/* Infos (Taille[]) */}
 <div>
  <Label>Tailles, prix et quantités</Label>
  <div className="space-y-4 mt-2">
    {infosFields.map((field, index) => (
      <div key={field.id} className="grid grid-cols-3 gap-2 items-end">
        <div>
          <Label htmlFor={`infos.${index}.taille`}>Taille</Label>
          <Input {...register(`infos.${index}.taille`)} placeholder="M" />
        </div>
        <div>
          <Label htmlFor={`infos.${index}.quantite`}>Quantité</Label>
          <Input type="number" {...register(`infos.${index}.quantite`)} placeholder="10" min={0} />
        </div>
        <div>
          <Label htmlFor={`infos.${index}.prix`}>Prix (€)</Label>
          <Input type="number" step="0.01" {...register(`infos.${index}.prix`)} placeholder="99.99" min={0} />
        </div>
        <button
          type="button"
          onClick={() => removeInfo(index)}
          className="text-red-500 text-sm col-span-3 text-right"
        >
          Supprimer
        </button>
      </div>
    ))}

    <Button
      type="button"
      variant="outline"
      onClick={() => appendInfo({ taille: '', quantite: 0, prix: 0 })}
    >
      + Ajouter une taille
    </Button>
  </div>
</div>

  {/* Boutons */}
  <div className="flex justify-end space-x-3 pt-6 border-t">
    <Button
      type="button"
      variant="outline"
      onClick={handleCloseDialog}
      disabled={isSubmitting}
    >
      Annuler
    </Button>
    <Button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Enregistrement...' : editingArticle ? 'Modifier' : 'Créer'}
    </Button>
  </div>
</form>